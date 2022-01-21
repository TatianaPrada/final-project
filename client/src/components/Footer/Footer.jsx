import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'

const Footer = (props) => {
    const {user} = props
  
    const style = ()=> {
      let style = {}
      if (user) {
        style ={width:"82vw", maxWidth: "100vw"}
      }  else {
        style ={width:"99vw"}
      }
      return style
    }

    const team = [
        {
            name: "José L. Valdés",
            linkedin: "https://www.linkedin.com/in/jose-luis-valdes-frontend/", 
            github: "https://github.com/ValdesDev"
        }, 
        {
            name: "Tatiana Prada",
            linkedin: "https://www.linkedin.com/in/tatiana-prada/", 
            github: "https://github.com/TatianaPrada"
        },
        {
            name: "Raquel Hidalgo",
            linkedin: "https://www.linkedin.com/in/raquel-hidalgo-corchuelo/", 
            github: "https://github.com/raqhidcor"
        }
    ]

return (
    <footer style={style()}>
    <div className="firstDiv">
        <p> © Copyright. All rights deserved.        Created and develoved by:</p>
    </div>
    <div className="links">
        {team.map((each, index) => {
          return (
            <div key={index + Date.now()} className="each">
                <p>{each.name}</p>
                <p><a href={each.github} target="blank"><GitHubIcon></GitHubIcon></a><a href={each.linkedin} target="blank"><LinkedInIcon></LinkedInIcon></a></p>
            </div>
            );
        })}
    </div>

    </footer>
)
}

export default Footer