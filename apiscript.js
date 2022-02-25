
       
      function bodyload() {
        var lstCatagory = document.getElementById("lstcatagories");
         var products = [];
        var container = document.getElementById("container");

        fetch("https://fakestoreapi.com/products/categories")
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var catagory = data;
            catagory.unshift("ALL");
            for (var item of data) {
              var opt = document.createElement("option");
              opt.text = item.toUpperCase();
              opt.value = item;
              lstCatagory.appendChild(opt);
            }
          });
          // getItemCount();
        displayAllProducts();
       
      }
      function displayAllProducts() {
        fetch("https://fakestoreapi.com/products")
          .then(function (responce) {
            return responce.json();
          })
          .then(function (data) {
            products = data;
            DisplayCard(products);
          });
      }

      function DisplayCard(products) {
        container.innerHTML = "";
        for (var item of products) {
          var div = document.createElement("div");
          div.className = "card m-3";
          div.style.width = "180px";

          div.innerHTML = `
                    <img src=${item.image} class="card-image-top" height="200"></img>
                    <div class="card-header" style="height:210px">
                      <h4>${item.title}</h4>    
                    </div>
                    <div class="card-body">
                        <p> &#8377; ${item.price}</p>
                    </div>
                    <div class="card-footer d-grid">
                        <button class="btn btn-warning" value=${item.id} onclick="addClick(this.value)"><span class="bi bi-cart4"> </span>Add to cart</button>
                    </div>
                    
                    
                    `;
          container.appendChild(div);
        }
      }

      function addClick(value) {
        alert(`${value} is added to cart`);
        getItemCount();
      }
      var cartItems=[];
      function getItemCount(){
          document.getElementById("lblCount").innerHTML=cartItems.length;
      }

      function changecatagory() {
        var CatagoryName = document.getElementById("lstcatagories").value;
        if (CatagoryName == "ALL") {
          displayAllProducts();
        } else {
          fetch(`https://fakestoreapi.com/products/category/${CatagoryName}`)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              products = data;
              DisplayCard(products);
            });
        }
      }