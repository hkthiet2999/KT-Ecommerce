<<<<<<< HEAD
=======
# Mô tả Unit test
Gồm 3 phần:
1. Unit test cho kết nối Database
2. Unit test cho các API
3. Unit test cho Workflow

## 1. Unit test kết nối Database
**Sử dụng:** chỉnh mocha ignore: `"ignore": ["test/workflow/**","test/api/**"],` từ file [/backend/.mocharc.json](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.mocharc.json), sau đó `npm test` hoặc `npm run coverage`

**Mô tả:** Gồm 2 unit test kiểm tra các test case kết nối thành công và thất bại đối với MongoDB [/test/connectDatabase/mongo.test.js](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/connectDatabase/mongo.test.js) và SQL Server [/test/connectDatabase/mssql.test.js](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/connectDatabase/mssql.test.js)

![](.images/db.png)

## 2. Unit test Workflow
**Sử dụng:** chỉnh mocha ignore: `"ignore": ["test/connectDatabase/**","test/api/**"],` từ file [/backend/.mocharc.json](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.mocharc.json), sau đó `npm test` hoặc `npm run coverage`

**Mô tả:** 

- [setup.test.js](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/workflow/setup.test.js)
Clean up database trước khi test

- [signup-singin.test.js](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/workflow/signup-singin.test.js)

Người dùng đăng ký tài khoản, hệ thống kế nối với MongoDB sau đó người dùng sử dụng tài khoản vừa đăng ký để đăng nhập vào hệ thống

- [signup-signin-add-get-update-delete.test.js](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/workflow/signup-signin-add-get-update-delete.test.js)

Người dùng đăng ký tài khoản rồi đăng nhập thành công vào hệ thống. Người dùng thực hiện lần lượt các thao tác Thêm 3 sản phẩm, Hiển thị danh sách toàn bộ sản phẩm, Cập nhật thông tin 1 sản phẩm và Xóa 1 sản phẩm thành công 

![](.images/workflow.png)

## 3. Unit test các API

**Sử dụng:** chỉnh mocha ignore: `"ignore": ["test/workflow/**","test/connectDatabase/**"],` từ file .mocharc.json, sau đó `npm test` hoặc `npm run coverage`

Dưới đây là hình tổng quan về độ Coverage của các unit test. Tổng cộng có 25 test case trình bày cụ thể bên dưới.

![](.images/0.png)

### a. Account Route

#### API Login

- [GET accounts/login](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/accounts/login/get.test.js)

**Test case:** Người dùng đăng nhập thành công vào trang Homepage, hiển thị thông báo đã đăng nhập thành công

![](.images/1.png)

- [POST accounts/login](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/accounts/login/post.test.js)

**Gồm 5 Test case:**

- Người dùng đăng nhập thành công sau đó sinh token

- Người dùng đăng nhập thất bại với Địa chỉ email không hợp lệ

- Người dùng đăng nhập thất bại với Địa chỉ email không tồn tại

- Người dùng đăng nhập thất bại với mật khẩu để trống

- Người dùng đăng nhập thất bại với mật khẩu không chính xác

![](.images/2.png)

#### API Register
- [POST accounts/register](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/accounts/register/post.test.js)

**Gồm 5 Test case:**

- Người dùng đăng ký tài khoản thành công

- Người dùng đăng ký tài khoản thất bại với tên ít hơn 6 ký tự

- Người dùng đăng ký tài khoản thất bại với đại chỉ email để trống

- Người dùng đăng ký tài khoản thất bại với mật khẩu ít hơn 6 ký tự

- Người dùng đăng ký tài khoản thất bại với mật khẩu xác nhận không khớp


![](.images/3.1.png)

![](.images/3.2.png)


### b. Product Route

#### API Add product

- [POST /products/add-product](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/products/add/post.test.js)

**Gồm 5 Test case:**

- Người dùng thêm sản phẩm mới thành công

![](.images/4.1.png)

- Người dùng chưa được xác thực thêm sản phẩm thất bại

![](.images/4.2.png)

- Người dùng nhập thiếu thông tin sản phẩm, cụ thể là thiếu tên sản phẩm

![](.images/4.3.png)

- Người dùng thêm sản phẩm với thông tin giá cả là chữ, không phải số

![](.images/4.4.png)

- Người dùng thêm ảnh mô tả sản phẩm không phải là tập tin ảnh

![](.images/4.5.png)


#### API Get products
- [GET /products/get-product](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/products/get/get.test.js)

**Gồm 3 Test case:**

- Người dùng chưa được xác thực xem danh sách sản phẩm thất bại

- Người dùng chưa có sản phẩm đăng bán

![](.images/5.1.png)

- Người dùng xem danh sách sản phẩm thành công, danh sách bên dưới hiện đang có 3 sản phẩm đăng bán

![](.images/5.2.png)


#### API Update product
- [POST /products/update-product](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/products/update/post.test.js)

**Gồm 3 Test case:**

- Người dùng chưa được xác thực cập nhật thông tin sản phẩm thất bại

![](.images/6.1.png)

- Người dùng cập nhật thông tin sản phẩm thành công

Danh sách sản phẩm trước khi cập nhật

![](.images/6.2.1.png)


Danh sách sản phẩm sau khi cập nhật thông tin sản phẩm Product 03

![](.images/6.2.2.1.png)
![](.images/6.2.2.2.png)

- Người dùng cập nhật thông tin sản phẩm thất bại do thiếu thông tin

![](.images/7.png)


#### API Delete product
- [POST /products/delete-product](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/test/api/products/delete/post.test.js)

**Gồm 3 Test case:**

- Người dùng chưa được xác thực xóa sản phẩm thất bại

![](.images/8.png)

- Người dùng xóa sản phẩm Product 02 trong danh sách sản phẩm thành công

Danh sách sản phẩm trước khi xóa gồm có 3 sản phẩm

![](.images/8.2.1.png)


Danh sách sản phẩm sau khi xóa sản phẩm Product 02

![](.images/8.2.2.png)

- Người dùng xóa sản phẩm thất bại do sản phẩm không tồn tại hoặc id sản phẩm là giả

![](.images/9.png)

### Xem thêm

- [_Coverage reporter_](https://smoothkt4951.github.io/KT-Ecommerce/)

- [_Demo_]()





>>>>>>> 0d812bc42bfbb4365b8cde6e4b2e616c3a7c21db
