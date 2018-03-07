package pl.stefanprogramuje.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.stefanprogramuje.blog.domain.Category;
import pl.stefanprogramuje.blog.service.CategoryService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.findAll();

        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        if (categoryService.findByNameUrl(category.getNameUrl()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Category createdCategory = categoryService.create(category);
        return ResponseEntity.ok(createdCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category categoryDetails) {
        Category currentCategory = categoryService.findById(id);
        if (currentCategory == null) {
            return ResponseEntity.noContent().build();
        }

        currentCategory.setName(categoryDetails.getName());
        currentCategory.setNameUrl(categoryDetails.getNameUrl());

        Category updatedCategory = categoryService.edit(currentCategory);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        Category category = categoryService.findById(id);

        if(category == null) {
            return ResponseEntity.noContent().build();
        }

        categoryService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
