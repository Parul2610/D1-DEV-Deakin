import { Card, Image } from "semantic-ui-react";

function Projects() {
    return (
        <div id="work" className="Portfolio">

            <Card>
                <Image
                    src="/bmi calculator.png"
                    wrapped
                    ui={false}
                    alt="Personal website project"
                />

                <Card.Content>
                    <Card.Header>
                        Personal Website
                    </Card.Header>

                    <Card.Description>
                        A responsive personal website created using HTML and CSS.
                    </Card.Description>
                </Card.Content>
            </Card>


            <Card>
                <Image
                    src="/calculator img .png"
                    wrapped
                    ui={false}
                    alt="Calculator project"
                />

                <Card.Content>
                    <Card.Header>
                        Calculator
                    </Card.Header>

                    <Card.Description>
                        A simple calculator made with HTML, CSS and JavaScript.
                    </Card.Description>
                </Card.Content>
            </Card>

        </div>
    );
}

export default Projects;