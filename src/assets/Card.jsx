import '../styles/card.css';
//import product from '../../data.js'


function Card() {
return ( 
<body>
  <div class="card">
    <div class="product-image">
      <img src="images/comfyslip.jpeg" alt="Product image"/>
    </div>
    <div class="product-content">
      <div class="product-name">Comfort Plush Sneakers</div>
      <div class="product-rating">
        <div class="stars">
          <div class="star filled">★</div>
          <div class="star filled">★</div>
          <div class="star filled">★</div>
          <div class="star filled">★</div>
          <div class="star">★</div>
        </div>
        <div class="product-price">₹2999</div>
      </div>
      <a class="cta" href="#">Add to cart</a>
    </div>
  </div>
</body>
)
}

export default Card;