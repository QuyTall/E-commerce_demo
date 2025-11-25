package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // 👇 1. Hàm mới: Lấy danh sách thường (cho Admin TableList)
    @Override
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Hàm cũ: Lấy phân trang (Giữ lại để dùng sau này)
    @Override
    @Transactional(readOnly = true)
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    // 👇 2. Hàm mới: Lấy Top Trendy (Gọi Repository đã sửa lúc nãy)
    @Override
    @Transactional(readOnly = true)
    public List<Product> getTrendyProducts() {
        // Gọi hàm tìm 8 sản phẩm giá cao nhất (hoặc bạn đổi thành findTop8ByOrderByIdDesc() để lấy mới nhất)
        return productRepository.findTop8ByOrderByPriceDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = getProductById(id);
        
        // 👇 3. Cập nhật ĐẦY ĐỦ các trường (Code cũ của bạn thiếu ảnh, brand...)
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());
        
        // Thêm mấy cái mới này vào:
        product.setImage(updatedProduct.getImage());
        product.setDescription(updatedProduct.getDescription());
        product.setBrand(updatedProduct.getBrand());
        
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        // Kiểm tra tồn tại trước khi xóa cho chắc ăn
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}