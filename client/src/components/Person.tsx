import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Loader, Panel } from "rsuite";
import "./Person.css";

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

const Person = () => {

    const [data, setData] = React.useState<Person>({} as Person);
    const [loading, setLoading] = React.useState(true);
    let { id } = useParams();
    const navigate = useNavigate();
    const handleNavigate = React.useCallback(() => navigate('/', { replace: true }), [navigate]);
    React.useEffect(() => {
        fetch("/api/people/" + id)
            .then(resp => {
                return resp.json();
            }).then(data => {
                setData(data);
                setLoading(false);
            }).catch(err => {
            });
    }, [])

    return (
        <div className="Person">
            <Panel header={<><h5>{data.name}</h5> <Divider /></>} bordered>
                {loading ? <Loader content="Loading..." /> :
                    <table>
                        <tr>
                            <td>Height</td>
                            <td>:</td>
                            <td>{data.height}</td>
                        </tr>
                        <tr>
                            <td>Mass</td>
                            <td>:</td>
                            <td>{data.mass}</td>
                        </tr>
                        <tr>
                            <td>Hair Color</td>
                            <td>:</td>
                            <td>{data.hair_color}</td>
                        </tr>
                        <tr>
                            <td>Skin Color</td>
                            <td>:</td>
                            <td>{data.skin_color}</td>
                        </tr>
                        <tr>
                            <td>Birth Year</td>
                            <td>:</td>
                            <td>{data.birth_year}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>:</td>
                            <td>{data.gender}</td>
                        </tr>
                    </table>
                }
                <Divider/>
                <Button appearance="primary" onClick={handleNavigate}> Go Home Back </Button> 
            </Panel>
        </div>
    )
}
export default Person;