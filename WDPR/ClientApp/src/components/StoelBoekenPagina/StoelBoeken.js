import './StoelBoeken.css';
import Stoel from "./Stoel";

export default function StoelBoeken(props) {

return (
    <div className="wrapper">
        <div className="zaal-grid">
            {props.stoelen.map(stoel => (
                <Stoel id={stoel.stoelnummer} />
            ))}
        </div>
    </div>
);
}