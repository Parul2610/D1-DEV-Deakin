import { Card, Image, Button, Rating } from "semantic-ui-react";

function FeaturedSection(props) {

    return (
        <section className="featured-section">

            <h2>{props.title}</h2>

            <div className="featured-container">

                {props.items.map((item) => (

                    <Card key={item.id}>

                        <Image
                            src={item.image}
                            wrapped
                            ui={false}
                            alt={item.title}
                        />

                        <Card.Content>

                            <Card.Header>
                                {item.title}
                            </Card.Header>

                            <Card.Description>
                                {item.description}
                            </Card.Description>

                            <div className="card-rating">

                                <Rating
                                    icon="star"
                                    defaultRating={item.rating}
                                    maxRating={5}
                                    disabled
                                />

                                <span>
                                    {props.personLabel}: {item.person}
                                </span>

                            </div>

                        </Card.Content>

                        <Card.Content extra>

                            <Button primary>
                                {props.buttonText}
                            </Button>

                        </Card.Content>

                    </Card>

                ))}

            </div>

        </section>
    );
}

export default FeaturedSection;