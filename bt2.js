let choice;
const books = [];
const carts = [];

const displayBook = (books) => {
  if (books.length === 0) {
    console.log(`Kho sach hien dang trong.`);
    return;
  }
  let category = prompt(`Nhap the loai sach muon xem`).toLowerCase().trim();
  let filteredBooks = books.filter(
    (book) => book.category.toLowerCase().trim() === category
  );
  if (filteredBooks.length === 0) {
    console.log(`Khong co sach nao`);
  } else {
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
  }
};

const validateInput = (id, name, price, quantity, category) => {
  if (
    id === null ||
    id === undefined ||
    name === null ||
    name === undefined ||
    price === null ||
    price === undefined ||
    quantity === null ||
    quantity === undefined ||
    category === null ||
    category === undefined
  ) {
    return false;
  }
  return true;
};

const addBook = (books) => {
  const id = +prompt(`Nhap id`);
  const name = prompt(`Nhap ten sach`);
  const price = +prompt(`Nhap gia sach`);
  const quantity = +prompt(`Nhap so luong`);
  const category = prompt(`Nhap the loai sach`);
  if (validateInput(id, name, price, quantity, category)) {
    const newBook = {
      id,
      name,
      price,
      quantity,
      category,
    };
    books.push(newBook);
    console.log(`Da them sach thanh cong`);
    return;
  }
  console.log(`Du lieu nhap vao khong hop le`);
  return;
};

const searchBook = (books) => {
  let index = 0;
  let choice = +prompt(`
        1. Tim kiem theo ten
        2. Tim kiem theo ID
        Lua chon cua ban`);
  switch (choice) {
    case 1:
      let searchName = prompt(`Nhap ten sach`);
      index = books.findIndex(
        (book) => book.name.toLowerCase() === searchName.toLowerCase().trim()
      );
      if (index !== -1) {
        console.log(`
                    Thong tin sach
                    ID : ${books[index].id}
                    Ten : ${books[index].name}
                    Gia : ${books[index].price}
                    So luong : ${books[index].quantity}
                    The loai : ${books[index].category}
                    `);
      } else {
        console.log(`Khong tim thay sach`);
      }
      break;
    case 2:
      let searchId = +prompt(`Nhap id sach`);
      index = books.findIndex((book) => book.id === searchId);
      if (index !== -1) {
        console.log(`
                    Thong tin sach
                    ID : ${books[index].id}
                    Ten : ${books[index].name}
                    Gia : ${books[index].price}
                    So luong : ${books[index].quantity}
                    The loai : ${books[index].category}
                    `);
      } else {
        console.log(`Khong tim thay sach`);
      }
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
};

const addToCart = (books, pick, index, carts) => {
  if (pick > books[index].quantity || pick <= 0) {
    console.log(`So luong san pham khong hop le`);
    return false;
  }
  let item = carts.find((cart) => cart.id === books[index].id);
  if (item) {
    item.quantity += pick;
  } else {
    const newCart = {
      id: books[index].id,
      name: books[index].name,
      price: books[index].price,
      quantity: pick,
    };
    carts.push(newCart);
  }
  books[index].quantity -= pick;
  return true;
};

const buyBook = (books) => {
  let searchId = +prompt(`Nhap ID`);
  let index = books.findIndex((book) => book.id === searchId);
  if (index !== -1) {
    let pick = +prompt(`
        Thong tin san pham : 
        ID : ${books[index].id}
        Ten : ${books[index].name}
        Gia : ${books[index].price}
        So Luong : ${books[index].quantity}
        Nhap so luong ban muon mua`);
    if (!addToCart(books, pick, index, carts)) {
      console.log(`So luong san pham khong hop le`);
      return;
    }
    console.log(`Da them vao gio hang thanh cong`);
  } else {
    console.log(`Khong tim thay san pham`);
    return;
  }
};

const sortBook = (books) => {
  let choice = +prompt(`
        1. Tang dan
        2. Giam dan
        Lua chon cua ban`);
  switch (choice) {
    case 1:
      books.sort((a, b) => a.price - b.price);
      console.log(`Da sap xep thanh cong`);
      break;
    case 2:
      books.sort((a, b) => b.price - a.price);
      console.log(`Da sap xep thanh cong`);
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
};

const totalCart = (carts) => {
  if (carts.length === 0) {
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

const quantityTotal = (books) => {
  const totalBook = books.reduce((total, book) => total + book.quantity, 0);
  console.log(`Tong so luong sach trong kho : ${totalBook}`);
};
do {
  choice = +prompt(`
        1. Hien thi danh sach theo the loai
        2. Them sach moi vao kho
        3. Tim kiem sach theo ten hoac id
        4. Mua sach
        5. Sap xep sach
        6. Tinh tong so luong sach da mua
        7. Hien thi so luong sach trong kho
        8. Thoat
        Lua chon cua ban`);
  switch (choice) {
    case 1:
      displayBook(books);
      break;
    case 2:
      addBook(books);
      break;
    case 3:
      searchBook(books);
      break;
    case 4:
      buyBook(books);
      break;
    case 5:
      sortBook(books);
      break;
    case 6:
      totalCart(carts);
      break;
    case 7:
      quantityTotal(books);
      break;
    case 8:
      console.log(`Tam biet`);
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
} while (choice !== 8);
