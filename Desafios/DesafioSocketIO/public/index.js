console.log("CONECTADO");

const socket = io();

// TIENE QUE COINCIDIR EL PRIMER PARAMETRO CON EL PRIMERO DEL BACK
socket.on("connection", () => {
  console.log("YOU ARE CONNECTED");
});

let prod = [];
socket.on("products", (data) => {
  prod = data;

  let htmlToRender = "";
  prod.forEach((el) => {
    htmlToRender =
      htmlToRender +
      `<th scope="row">${el.id}</th>
                <td> ${el.title}</td>
                <td>${el.price}</td>
                <td><img src="${el.thumbnail}" class="product-img"/></td>
        </tr>`;
  });
  console.log(htmlToRender);
  if (document.querySelector("#products") != null) {
    document.querySelector("#products").innerHTML = htmlToRender;
  }
});
