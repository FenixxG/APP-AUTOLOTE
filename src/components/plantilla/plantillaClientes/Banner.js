import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';

// Site Data
import BannerImg1 from '../../../assets/images/banner/home-bg-text.webp';
import BannerImg2 from '../../../assets/images/banner/carro-banner.png';

// SCSS
import './style.scss';

function Banner() {
    return (
        <>
            <section className="banner section-bg-half">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="banner-bg-text">
                                <img className="img-fluid" src={BannerImg1} alt="Fondo de texto" />
                            </div>
                            <img className="img-fluid banner-car" src={BannerImg2} alt="Banner de carro" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Banner;
