package pl.stefanprogramuje.blog.service;

import pl.stefanprogramuje.blog.domain.Category;

import java.util.List;

public interface CategoryService {

    List<Category> findAll();

    Category findById(Long id);

    Category create(Category category);

    Category edit(Category category);

    void deleteById(Long id);
}
