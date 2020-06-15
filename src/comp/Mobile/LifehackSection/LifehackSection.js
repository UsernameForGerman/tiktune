import classes from "./LifehackSection.module.css";
import React from "react";
import share from "../../../assets/img/share.png";
import addIcon from "../../../assets/img/addIcon.png";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
let LifehackSection = (props) => {
    return(
        <section className={classes.Lifehack}>
            <MobileContainer withShadow>
                <div className={classes.lifehackWrapper}>
                    <span className={classes.desc}>
                        Хотите находить музыку еще быстрее?
                    </span>
                    <div className={classes.iosLabel}>
                        ios
                    </div>
                    <div className={classes.labeledIcon}>
                        <img className={classes.icon} src={share} alt={"ios share icon"}/>
                        <span className={classes.label}>
                            Нажмите на кнопку «Поделиться»
                            в меню Safari
                        </span>
                    </div>
                    <div className={classes.labeledIcon}>
                        <img className={classes.icon} src={addIcon} alt={"ios add icon"}/>
                        <span className={classes.label}>
                            Выберите иконку
                            на экран «Домой»
                        </span>
                    </div>
                </div>
            </MobileContainer>
        </section>
    );
}

export default LifehackSection;