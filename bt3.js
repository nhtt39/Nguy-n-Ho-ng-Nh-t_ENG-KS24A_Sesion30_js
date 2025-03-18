let choice;
const phone = [];
const carts = [];

const addPhone = (phone) => {
  const id = +prompt(`Nhap ID`);
  const namePhone = prompt(`Nhap ten dien thoai`);
  const price = +prompt(`Nhap gia`);
  const quantity = +prompt(`Nhap so luong`);
  const brand = prompt(`Nhap hang dien thoai`);
  const newPhone = {
    id,
    namePhone,
    price,
    quantity,
    brand,
  };
  phone.push(newPhone);
  console.log(`Da them thanh cong`);
};

const displayPhone = (phone) => {
  const searchBrand = prompt(`Nhap hang dien thoai`);
  const filteredPhones = phone.filter(
    (phone) => phone.brand.toLowerCase() === searchBrand.toLowerCase()
  );

  if (filteredPhones.length > 0) {
    console.log(`${searchBrand} : `);
    filteredPhones.forEach((phone, index) => {
      console.log(
        `${index + 1}. ${phone.namePhone} - Gia : ${phone.price} - So luong : ${
          phone.quantity
        }`
      );
    });
  } else {
    console.log(`Khong co dien thoai nao cua hang`);
  }
};

const searchPhone = (phone) => {
  let search = prompt(`Nhap ten hoac ID cua dien thoai`);
  let index = phone.findIndex(
    (device) =>
      device.namePhone.toLowerCase() === search.toLowerCase() ||
      device.id == search
  );
  if (index !== -1) {
    console.log(`
            ID : ${phone[index].id}
            Ten : ${phone[index].namePhone}
            Gia : ${phone[index].price}
            So luong : ${phone[index].quantity}
            Hang : ${phone[index].brand}`);
  } else {
    console.log(`Khong tim thay dien thoai`);
    return;
  }
};

const addToCart = (phone, pick, index, carts) => {
  if (pick > phone[index].quantity || pick <= 0) {
    console.log(`So luong san pham khong hop le`);
    return false;
  }
  let item = carts.find((cart) => cart.id === phone[index].id);
  if (item) {
    item.quantity += pick;
  } else {
    const newCart = {
      id: phone[index].id,
      namePhone: phone[index].namePhone,
      price: phone[index].price,
      quantity: pick,
    };
    carts.push(newCart);
  }
  phone[index].quantity -= pick;
  return true;
};

const buyPhone = (phone) => {
  let searchId = +prompt(`Nhap ID`);
  let index = phone.findIndex((device) => device.id === searchId);
  if (index !== -1) {
    let pick = +prompt(`
        Thong tin san pham : 
        ID : ${phone[index].id}
        Ten : ${phone[index].namePhone}
        Gia : ${phone[index].price}
        So Luong : ${phone[index].quantity}
        Hang : ${phone[index].brand}
        Nhap so luong ban muon mua`);
    if (!addToCart(phone, pick, index, carts)) {
      console.log(`So luong san pham khong hop le`);
      return;
    }
    console.log(`Da them vao gio hang thanh cong`);
  } else {
    console.log(`Khong tim thay san pham`);
    return;
  }
};

const payPhone = (carts) => {
  if (carts.length === 0) {
    console.log(`Chua co san pham nao trong gio hang`);
    return;
  }
  let total = 0;
  carts.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    console.log(
      `${index + 1}. ${item.namePhone} - ${item.quantity} x ${
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
  let pay = confirm(`Ban co chac chan muon thanh toan`);
  if (!pay) {
    console.log(`Thanh toan khong thanh cong`);
    return;
  }
  console.log(`Da thanh toan thanh cong`);
  carts.length = 0;
  return;
};

const sortPhone = (phone) => {
  let choice = +prompt(`
        1. Tang dan theo gia
        2. Giam dan theo gia`);
  switch (choice) {
    case 1:
      phone.sort((a, b) => a.price - b.price);
      console.log(`Da sap xep thanh cong`);
      break;
    case 2:
      phone.sort((a, b) => b.price - a.price);
      console.log(`Da sap xep thanh cong`);
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
};

const totalMoneyStorage = (phone) => {
  const totalMoneyPhone = phone.reduce(
    (total, device) => total + device.price * device.quantity,
    0
  );
  console.log(
    `Tong tien trong kho: ${totalMoneyPhone.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    })} VND`
  );
};

const displayPhoneBrand = (phone) => {
  const searchBrand = prompt(`Nhap hang dien thoai`);
  const filteredPhones = phone.filter(
    (phone) => phone.brand.toLowerCase() === searchBrand.toLowerCase()
  );
  const totalQuantityPhone = filteredPhones.reduce(
    (total, device) => total + device.quantity,
    0
  );
  console.log(`Tong so luong dien thoai la : ${totalQuantityPhone}`);
};

do {
  choice = +prompt(`
        1. Hien thi danh sach dien thoai theo hang
        2. Them dien thoai moi vao cua hang
        3. Tim kiem dien thoai theo ten hoac ID
        4. Mua dien thoai
        5. Thanh toan tat ca dien thoai trong gio hang
        6. Sap xep dien thoai theo gia
        7. Hien thi tong so tien cua cac dien thoai trong kho
        8. Hien thi tong so luong dien thoai theo tung hang
        9. Thoat
        Lua chon cua ban`);
  switch (choice) {
    case 1:
      displayPhone(phone);
      break;
    case 2:
      addPhone(phone);
      break;
    case 3:
      searchPhone(phone);
      break;
    case 4:
      buyPhone(phone);
      break;
    case 5:
      payPhone(carts);
      break;
    case 6:
      sortPhone(phone);
      break;
    case 7:
      totalMoneyStorage(phone);
      break;
    case 8:
      displayPhoneBrand(phone);
      break;
    case 9:
      console.log(`Tam biet`);
      break;
    default:
      console.log(`Lua chon khong hop le`);
      break;
  }
} while (choice !== 9);
