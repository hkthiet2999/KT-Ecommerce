const express = require('express');
const Router  = express.Router()

// swagger
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Documents',
      version: '1.0.0'
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'token',
        scheme: 'bearer',
        in: 'header',
      },
    }
  },
  apis: ['index.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
console.log(swaggerDocs)

// yaml config

/**
 * @swagger
 * /accounts/login:
 *   post:
 *     description: Gửi thông tin người dùng đăng nhập
 *     parameters:
 *        - in: body
 *          name: user
 *          description: Người dùng gửi thông tin đăng nhập
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *        200:
 *          description: Đăng nhập thành công sẽ chuyển đến Home Page
 *   get:
 *     description: Trả về thông báo đăng nhập thành công
 *     responses:
 *       200:
 *         description: Đã đăng nhập thành công
 * 
 * /accounts/register:
 *   post:
 *     description: Gửi thông tin người dùng đăng ký tài khoản mới
 *     parameters:
 *        - in: body
 *          name: user
 *          description: Người dùng gửi thông tin đăng ký
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              fullname: 
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              confirm_password:
 *                type: string
 *     responses:
 *        200:
 *          description: Đăng ký thành công sẽ chuyển đến Login Page
 *
 * /products/add-product:
 *   post:
 *     description: Gửi thông tin sản phẩm cần thêm
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *       - application/json
 *     parameters:
 *        - name: name
 *          in: formData
 *          description: Tên sản phẩm
 *          type: string
 *        - name: desc
 *          in: formData
 *          description: Mô tả sản phẩm
 *          type: string
 *        - name: price
 *          in: formData
 *          description: Giá tiền
 *          type: number
 *        - name: discount
 *          in: formData
 *          description: Khuyến mãi
 *          type: number
 *        - name: files
 *          in: formData
 *          description: File ảnh của sản phẩm
 *          type: file 
 *     responses:
 *        200:
 *          description: Thêm thông tin sản phẩm thành công
 * 
 * /products/get-product:
 *   get:
 *     description: Trả về thông tin sản phẩm cần thêm
 *     responses:
 *        200:
 *          description: Trả về thông tin sản phẩm
 *        400:
 *          description: Trả về thông báo chưa có sản phẩm nào để bán
 *
 * /products/update-product:
 *   post:
 *     description: Gửi thông tin sản phẩm cần cập nhật
 *     parameters:
 *        - in: body
 *          name: product
 *          description: Người dùng gửi thông tin sản phẩm cần cập nhật
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *              desc:
 *                type: string
 *              price:
 *                type: number
 *              discount:
 *                type: number
 *              files:
 *                type: string
 *     responses:
 *        200:
 *          description: Cập nhật thông tin sản phẩm thành công
 * 
 * /products/delete-product:
 *   post:
 *     description: Gửi thông tin sản phẩm cần xóa
 *     parameters:
 *        - in: body
 *          name: product
 *          description: Người dùng gửi thông tin sản phẩm cần xóa
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              desc:
 *                type: string
 *              price:
 *                type: number
 *              discount:
 *                type: number
 *              files:
 *                type: string
 *                  
 *     responses:
 *        200:
 *          description: Xóa sản phẩm thành công
 * */
module.exports = Router