import * as React from "react";
import * as ReactDOM from "react-dom";
import { data } from "./data";
import { User } from "./User";
import "./sassStyles.css";

enum Gender {
    Male = "Male",
    Female = "Female",
}
interface Props {}

interface Users {
    UsersData: User[];
}

class App extends React.Component<Props, Users> {
    constructor(props: Users) {
        super(props);
        this.state = {
            UsersData: [],
        };
    }

    public componentDidMount() {
        this.setState({
            UsersData: data,
        });
    }

    protected filterGenderMale = () => {
        this.resetArray();
        this.setState(state => ({
            UsersData: state.UsersData.filter(i => i.gender === Gender.Male)
        }));
    }

    protected filterGenderFemale = () => {
        this.resetArray();
        this.setState(state => ({
            UsersData: state.UsersData.filter(i => i.gender === Gender.Female)
        }));
    }

    protected resetArray = () => {
        this.setState({
            UsersData: data,
        });
    }

    protected filterByInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        console.log(event.target.value);
        this.resetArray();
        this.setState(state => ({
            UsersData: state.UsersData.filter(i => (i.first_name != null && undefined) ? i.first_name.startsWith(event.target.value) : "" )
        }));

    }

// protected filterByName: React.ChangeEventHandler<
//    HTMLInputElement
//  > = event => {
//    this.setState({
//      UsersData: this.state.filtered.filter(
//        x =>
//          (x.first_name != null
//            ? x.first_name.startsWith(event.target.value)
//            : "") ||
//          (x.last_name != null
//            ? x.last_name.startsWith(event.target.value)
//            : "")
//      )
//    });
//  }

    public render(): JSX.Element {
        return (

            <div className="frame">
                <div className="input"><input onChange={this.filterByInput} type="text" /></div>
                <div className="Buttons">
                <button onClick={this.filterGenderMale} > Filter Male</button>
                <button onClick={this.filterGenderFemale} > Filter Female</button>
                <button onClick={this.resetArray} > Reset Array</button>
                </div>
                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>First Namee</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>IP Adress</th>
                    </thead>
                    <tbody>
                        {this.state.UsersData.map((dataA, i) =>
                            (
                                <tr key={i}>
                                    <td>{dataA.id}</td>
                                    <td>{dataA.first_name}</td>
                                    <td>{dataA.last_name}</td>
                                    <td>{dataA.email}</td>
                                    <td>{dataA.gender}</td>
                                    <td>{dataA.ip_address}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById("app-root"));
