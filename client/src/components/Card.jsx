
const Card = ({ card, onClick }) => {
    return (
        <div
            onClick={() => onClick(card)}
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                cursor: 'pointer',
            }}
        >
            <p>{card.text}</p>
            <p>{card.time}</p>
        </div>
    );
};

export default Card;
