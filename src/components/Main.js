import { Component } from "react";
import "./Main.css";
import Button from "./reusable/Button.js";

export default class Main extends Component {

    MainRow({ children }) {
        return <div className="main-row">{children}</div>;
    }

    render() {
        return (
            <>
                <this.MainRow>
                    <Button to="/sides" text="Лица (Стороны по делу)" width="90%" variant="big" />
                </this.MainRow>
                <this.MainRow>
                    <Button text="Добавить договор / расписку" width="90%" variant="big" />
                </this.MainRow>
                <this.MainRow>
                    <Button disabled text="Суд" width="90%" variant="big" />
                </this.MainRow>
                <br />
                <this.MainRow>
                    <Button disabled text="Калькулятор" width="65%" variant="big" disabledColor="#1596c2" color="deepskyblue" />
                </this.MainRow>
            </>
        );
    }
}
