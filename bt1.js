let carts = [];
let choice;
let products = [
  {
    id: 1,
    name: `mèn mén`,
    price: 20000,
    quantity: 20,
    category: `Món ăn dân tộc Mông`,
  },
  {
    id: 2,
    name: `mứt`,
    price: 80000,
    quantity: 21,
    category: `Món ăn dân tộc Kinh`,
  },
  {
    id: 3,
    name: `Cơm lam`,
    price: 40000,
    quantity: 15,
    category: `Món ăn dân tộc Mông`,
  },
  {
    id: 4,
    name: `bánh đậu xanh`,
    price: 60000,
    quantity: 30,
    category: `Món ăn dân tộc Kinh`,
  },
];

const displayBook = (books) => {
  let choice = +prompt(
    `The loai ban muon xem la : 
        1. ${products[0].category}
        2. ${products[1].category}`
  );
  if (choice === 1) {
    let filteredBooks = books.filter(
      (book) => book.category === products[0].category
    );
  } else {
    let filteredBooks = books.filter(
      (book) => book.category === products[1].category
    );
  }
  console.log(`Danh sach sach thuoc the loai ${category}:`);
  filteredBooks.forEach((book) => {
    console.log(`
            ID: ${book.id}
            Ten: ${book.name}
            Gia: ${book.price}
            So luong: ${book.quantity}
            The loai: ${book.category}
            `);
  });
};

const addToCart = (products, pick, index, carts) => {
  if (pick > books[index].quantity || pick <= 0) {
    console.log(`So luong san pham khong hop le`);
    return false;
  }
  let item = carts.find((cart) => cart.id === products[index].id);
  if (item) {
    item.quantity += pick;
  } else {
    const newCart = {
      id: products[index].id,
      name: products[index].name,
      price: products[index].price,
      quantity: pick,
    };
    carts.push(newCart);
  }
  products[index].quantity -= pick;
  return true;
};

const searchProduct = (products) => {
  let searchId = +prompt(`Nhap ID`);
  let index = products.findIndex((product) => product.id === searchId);
  if (index !== -1) {
    let pick = +prompt(`
        Thong tin san pham : 
        ID : ${products[index].id}
        Ten : ${products[index].name}
        Gia : ${products[index].price}
        So Luong : ${products[index].quantity}
        Nhap so luong ban muon mua`);
    if (!addToCart(products, pick, index, carts)) {
      console.log(`So luong san pham khong hop le`);
      return;
    }
    console.log(`Da them vao gio hang thanh cong`);
  } else {
    console.log(`Khong tim thay san pham`);
    return;
  }
};

const sortProduct = (products) => {
  let choice = +prompt(`
        1. Tang dan
        2. Giam dan
        Lua chon cua ban`);
  switch (choice) {
    case 1:
      products.sort((a, b) => a.price - b.price);
      console.log(`Da sap xep thanh cong`);
      break;
    case 2:
      products.sort((a, b) => b.price - a.price);
      console.log(`Da sap xep thanh cong`);
      break;
    case 3:
      console.log(`Tam biet`);
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
};

const totalCart = (carts) => {
  if (carts.lenght === 0) {
    console.log(`Chua co san pham nao trong gio hang`);
    return;
  }
  let total = 0;
  carts.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    console.log(
      `${index + 1}. ${item.name} - ${item.quantity} x ${
        item.price
      } = ${itemTotal.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })} VND`
    );
  });

  console.log(
    `Tong tien: ${total.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    })} VND`
  );
};

do {
  choice = +prompt(`
        1. Hien thi san pham theo danh muc
        2. Chon san pham
        3. Sap xep san pham
        4. Tinh so tien thanh toan trong gio hang
        5. Thoat
        Lua chon cua ban`);
  switch (choice) {
    case 1:
      displayProduct(products);
      break;
    case 2:
      searchProduct(products);
      break;
    case 3:
      sortProduct(products);
      break;
    case 4:
      totalCart(carts);
      break;
    case 5:
      console.log(`Tam biet`);
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
} while (choice !== 5);
