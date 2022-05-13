import React from 'react'
import { VscGithub } from 'react-icons/vsc'
const Footer = () => (
    <div className = 'footer' style = {{display : 'flex', justifyContent : 'center'}}>
        <a href = "https://github.com/hongyj9823/newStock_client.git"
        style = {{ color : 'gray' ,textDecoration : 'none' ,display:'flex', alignItems :'center'}}>
            <VscGithub size = '15' />
            <span style = {{padding : '5px'}}>newStock</span>
        </a>
    </div>
)

export default Footer;