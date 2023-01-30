import { useState, useEffect, Component } from "react";
import Axios from "axios";
import Navigatie from "../navFoot/navbar";
import Footer from "../navFoot/Footer";
import "./VoorstellingDetail.css"
import GetEndpoint from "../Admin/EndPointUtil";

class VoorstellingDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            averageRating: null,
            voorstelling: [],
            gebruiker: [],
            agendas: [],
            reviews: [],
            newReview: {
                gebruikerId: '',
                voorstellingId: '',
                recensie: '',
                sterren: 0
            }

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var gebruikersnaam = sessionStorage.getItem('gebruikersNaam');
    
        if (gebruikersnaam === "" || gebruikersnaam === null) {
            alert("Helaas, je moet inloggen om voor deze voorstelling een review te plaatsen");
            return;
        }
        Axios.get(GetEndpoint()+`api/gebruiker/GebruikerIdOpvragen?email=${gebruikersnaam}`).then((res) => {
            this.setState({ gebruiker: res.data });
            this.state.newReview.gebruikerId = res.data.id;
    
            this.state.newReview.voorstellingId = this.state.voorstelling.id;
    
            Axios.post(GetEndpoint()+"api/review", this.state.newReview)
                .then(res => {
                    this.setState(prevState => {
                        return {
                            reviews: [...prevState.reviews, res.data],
                            newReview: {
                                gebruikerId: '',
                                voorstellingId: '',
                                recensie: '',
                                sterren: 0
                            }
                        }
                    });
                    // Here you can make the API call to get the new average rating
                    Axios.get(GetEndpoint()+`api/review/average/${this.state.voorstelling.id}`)
                    .then(res => {
                        
                        this.setState({ averageRating: Math.round(res.data * 10) / 10 });
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => alert("Je kan niet nog een review plaatsen"));
        });
    }
    

    componentDidMount() {

        const queryParameters = new URLSearchParams(window.location.search);
        const voorstellingId = queryParameters.get("itemId");


        Axios.get(GetEndpoint()+`api/review/average/${voorstellingId}`)
            .then(res => {
                this.setState({ averageRating: Math.round(res.data * 10) / 10 });

            })
            .catch(err => console.log(err));


        Axios.get(GetEndpoint()+`api/Voorstelling/${voorstellingId}`).then((res) => {
            console.log(res.data.BandId);
            this.setState({ voorstelling: res.data });
        });

        Axios.get(GetEndpoint()+`api/agenda/voorstelling/${voorstellingId}`)

            .then((res) => {
                if (res.data == null) return;
                for (let i = 0; i < res.data.length; i++) {
                    this.state.agendas.push(res.data[i]);
                    this.setState({ agendas: this.state.agendas });
                    console.log(res.data[i])
                }
            }
        );
        Axios.get(GetEndpoint()+`api/review/voorstelling/${voorstellingId}`)
            .then((res) => {
                this.setState({ reviews: res.data });
            });
    }

    render() {

        const agendaItems = this.state.agendas.map(agenda => {
            const startDatumTijd = new Date(agenda.startDatumTijd).toLocaleDateString(undefined, {hour: '2-digit', minute:'2-digit'});
            const eindDatumTijd = new Date(agenda.startDatumTijd).toLocaleDateString(undefined, {hour: '2-digit', minute:'2-digit'});

            return (
                <section className="AgendaItem">
                    <p>Starttijd: {startDatumTijd}</p>
                    <p>Eindtijd: {eindDatumTijd}</p>
                    <a href={`voorstelling/boekstoel?zaalId=${agenda.zaalId}&agendaId=${agenda.id}`} className="Boekknop">Boek Stoelen</a>
                </section>
            );
        });
        let reviewItems;
        if (this.state.reviews.length > 0) {
            reviewItems = this.state.reviews.map(review => {
                // Axios.get(GetEndpoint()+`api/gebruiker/${review.gebruikerId}`)
                return (
                    <section className="reviewItem">
                        <p className="ReviewText">{review.recensie}</p>
                        <p>{review.sterren} Sterren</p>
                    </section>

                );
            });

        } else {
            reviewItems = <p>Er zijn geen recensies voor deze voorstelling.</p>;
        }

        return (
            <>
                <Navigatie />
                <div className="main">
                    <div className="voorstellingInfoWrapper">
                        <div className="VoorstellingInfo">
                            <img className="voorstellingPlaatje" src={this.state.voorstelling.img} alt="..." />
                            <div className="VoorstellingText">
                                <h1>{this.state.voorstelling.name}</h1>
                                <div className="Lijntje"></div>
                                <p>{this.state.voorstelling.beschrijving}</p>
                            </div>
                        </div>
                        <div>
                            <p className="Review">Gemiddelde Sterren: {this.state.averageRating}</p>
                            <h3>Recensies</h3>
                            <div className="reviewItems">{reviewItems}</div>

                        </div>
                        <h4>Plaats Nieuwe Review</h4>
                        <div className="FormWrapper">
                        <form onSubmit={this.handleSubmit} className="Survey">
                            <label>
                                Review:
                                <textarea value={this.state.newReview.recensie} onChange={(e) => this.setState({ newReview: { ...this.state.newReview, recensie: e.target.value } })} />
                            </label>
                            <label>
                                Sterren:
                                <input type="number" min="1" max="5" value={this.state.newReview.sterren} onChange={(e) => this.setState({ newReview: { ...this.state.newReview, sterren: e.target.value } })} />
                            </label>
                            <input type="submit" value="Plaats Review" />
                        </form>
                        </div>

                        <h2>Boek Stoelen Voor {this.state.voorstelling.name}</h2>
                        <div className="agendaItem">{agendaItems}</div>

                    </div>
                <Footer />
                </div>
            </>

        );
    }
}
export default VoorstellingDetail;