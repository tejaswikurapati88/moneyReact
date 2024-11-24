import './index.css'
import { MdAttachEmail } from "react-icons/md";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer=()=>{
    return (
        <div className='footer-bg-contianer'>
            <div>
                <a href='mailto:tejaswikurapati88@gmail.com' rel="noreferrer" target='_blank'><MdAttachEmail className='icon' /></a>
                <FaTwitter className='icon' />
                <a href='https://www.linkedin.com/in/1tejaswi1' rel="noreferrer" target='_blank'><FaLinkedin className='icon' /></a>
                <a href='https://github.com/tejaswikurapati88' rel="noreferrer" target='_blank'> <FaGithub className='icon' /></a>
            </div>
            <p className='dev'>Developed by <span className='myname'>@Tejaswi Kurapati</span></p>
        </div>
    )
}

export default Footer