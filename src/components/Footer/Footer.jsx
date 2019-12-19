import React from 'react'
import { Row, Col} from 'react-bootstrap'
import './Footer.css';
import { Icon } from 'semantic-ui-react'

const Footer = () => {
    return (
        <div className="Footer-div">
            <Row >
                <Col style={{margin: '10px auto', textAlign:'center'}}><h4><Icon style={{display:'block', margin:'0 auto'}} name='handshake outline' /> OPEN BAZAAR </h4></Col>
            </Row>
            {/* <Row>
            <div className="col-md-6 col-sm-6" style={{ marginLeft: 'auto', marginRight:'auto', display: 'block'}}><img src="https://i.imgur.com/4wYSqBt.png" width="118px" height="79px"/></div>
            <div className="col-md-6 col-sm-6" style={{ marginLeft: 'auto', marginRight:'auto', display:'block'}}><img src="https://i.imgur.com/RQ1NP8M.png" width="128px" height="89px"/></div>
            </Row> */}
            <Row>
            <div className="col-md-4 col-sm-4"></div>
            <div className="col-md-4 col-sm-4"></div>
            <div className="col-md-4 col-sm-4"></div>
            </Row>
            <Row className="footer-info-row" style={{marginLeft:'5%',marginRight:'5%', marginBottom:'-10px'}}>
            <Col><p className="footer-info-col">Terms of Use</p></Col>
            <Col className="footer-spacer"><p>|</p></Col>
            <Col><p className="footer-info-col">Privacy Policy</p></Col>
            <Col className="footer-spacer"><p>|</p></Col>
            <Col><p className="footer-info-col">Social Media</p></Col>
            <Col className="footer-spacer"><p>|</p></Col>
            <Col><p className="footer-info-col">About Us</p></Col>
           </Row>
           <br/>
        </div >
    )
}

export default Footer