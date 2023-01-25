import EndpointPanel from "./EndpointPanel";

export default class GetPanel extends EndpointPanel {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            fields: props.fields,
            title: props.title,
            endpoint: props.endPoint,
            extraData: props.extraData,
            getResult: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [id]: value }
        }));
    }

    handleGetSubmit = async () => {
        let endpoint = this.state.endpoint;
        for (let i = 0; i < this.state.fields.length; i++) {
            endpoint += "/" + (this.state.formData[this.state.fields[i].id] || this.defaultForType(this.state.fields[i]));
        }

        const result = await this.getFromEndpoint(endpoint);
        this.setState({
            getResult: JSON.stringify(result, null, 4)
        });
    }

    render() {
        let fieldSections = [];
        for (let i = 0; i < this.state.fields.length; i++) {
            fieldSections.push(this.createField(this.state.fields[i]));
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <h3>
                        {this.state.title}:
                    </h3>
                    {fieldSections}
                    <button type="button" onClick={this.handleGetSubmit}>
                        Get
                    </button>
                </form>
                Response:
                <br />
                <textarea value={this.state.getResult} readOnly />
            </div>
        );
    }
}