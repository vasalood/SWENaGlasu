import './QuoteItem.css';
import { useEffect,useState } from 'react';
const QuoteItem =()=>{
    
    useEffect(() => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach((item) => {
          item.addEventListener('click', () => {
            const button = item.querySelector('.accordion-button');
            const target = document.querySelector(button.dataset.bsTarget);
            button.classList.toggle('collapsed');
            target.classList.toggle('show');
            target.style.height = target.classList.contains('show') ? `${target.scrollHeight}px` : '0';
          });
        });
      }, []);
      
    return(<>
        <div className="section">
          <div className="container p-4 p-md-5">
            <div className="row banner-news">
              <div className="col-lg-12 px-5">
                <h4 className="pb-3">Section Title</h4>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
                  <div className="col">
                    <div className="card">
                      <img
                        src="https://media.springernature.com/w580h326/nature-cms/uploads/collections/A84876_SREP_TOP_100_CELL_BIO_HERO_IMAGE_1200x675px_Proof1-c9bedd3f16f08fa7862e3215f2b2e4ea.jpg"
                        className="img-fluid"
                      />
                      <div className="card-body p-0">
                        <div
                          className="accordion accordion-flush"
                          id="accordionCard1"
                        >
                          <div className="accordion-item">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#education-card1"
                              aria-expanded="false"
                              aria-controls="education-card1"
                             
                            >
                              <p className="card-title">Cell Therapy </p>
                            </button>
                            {<div
                              id="education-card1"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionCard1"
                            >
                              <div className="accordion-body">
                                <p className="card-text">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing
                                  elit, sed do eiusmod tempor incididunt ut labore et
                                  dolore magna aliqua. Ut enim ad minim veniam, quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.
                                </p>
                              </div>
                            </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <img
                        src="https://d1g9yur4m4naub.cloudfront.net/image-handler/picture/2021/2/shutterstock_1188127132.jpg"
                        className="img-fluid"
                      />
                      <div className="card-body p-0">
                        <div
                          className="accordion accordion-flush"
                          id="accordionCard2"
                        >
                          <div className="accordion-item">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#education-card2"
                              aria-expanded="false"
                              aria-controls="education-card2"
                            >
                              <p className="card-title"> Antibodies</p>
                            </button>
                            <div
                              id="education-card2"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionCard2"
                            >
                              <div className="accordion-body">
                                <p className="card-text">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing
                                  elit, sed do eiusmod tempor incididunt ut labore et
                                  dolore magna aliqua. Ut enim ad minim veniam, quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <img
                        src="https://cdn.technologynetworks.com/tn/images/body/humancellnuclei1512470985301.jpg"
                        className="img-fluid"
                      />
                      <div className="card-body p-0">
                        <div
                          className="accordion accordion-flush"
                          id="accordionCard3"
                        >
                          <div className="accordion-item">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#education-card3"
                              aria-expanded="false"
                              aria-controls="education-card3"
                            >
                              <p className="card-title">Cancer</p>
                            </button>
                            <div
                              id="education-card3"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionCard3"
                            >
                              <div className="accordion-body">
                                <p className="card-text">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing
                                  elit, sed do eiusmod tempor incididunt ut labore et
                                  dolore magna aliqua. Ut enim ad minim veniam, quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <img
                        src="https://chanzuckerberg.com/wp-content/uploads/2022/11/22_1128-Lab-Made-Stem-Cells-Transforming-Research-Hero.jpg"
                        className="img-fluid"
                      />
                      <div className="card-body p-0">
                        <div
                          className="accordion accordion-flush"
                          id="accordionCard4"
                        >
                          <div className="accordion-item">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#education-card4"
                              aria-expanded="false"
                              aria-controls="education-card4"
                            >
                              <p className="card-title">Immune System</p>
                            </button>
                            <div
                              id="education-card4"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionCard4"
                            >
                              <div className="accordion-body">
                                <p className="card-text">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing
                                  elit, sed do eiusmod tempor incididunt ut labore et
                                  dolore magna aliqua. Ut enim ad minim veniam, quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*/.col-lg-12*/}
            </div>
            {/*/.row */}
          </div>
          {/*/.container*/}
        </div>
        {/*/.section*/}
      </>
      )
}
export default QuoteItem;