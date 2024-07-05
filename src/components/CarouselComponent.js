// src/components/CarouselComponent.js

import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import client from '../contentfulClient';
import './Carousel.css';

const CarouselComponent = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const query = `
        {
          carouselImageCollection {
            items {
              imageCollection {
                items {
                  url
                }
              }
              description
            }
          }
        }
      `;
      try {
        const response = await client.request(query);
        setCarouselItems(response.carouselImageCollection.items);
      } catch (error) {
        console.error('Error fetching carousel items:', error.message);
      }
    };

    fetchCarouselItems();
  }, []);

  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src={item.imageCollection.items[0].url} // Assuming the first image is displayed
              alt={item.description}
            />
          </div>
          {item.description && (
            <Carousel.Caption>
              <h3>{item.description}</h3>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
