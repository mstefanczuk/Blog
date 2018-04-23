package pl.stefanprogramuje.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.stefanprogramuje.blog.domain.Category;
import pl.stefanprogramuje.blog.domain.repository.CategoryRepository;
import pl.stefanprogramuje.blog.service.CategoryService;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findOne(id);
    }

    @Override
    public Category findByNameUrl(String nameUrl) {
        return categoryRepository.findByNameUrl(nameUrl);
    }

    @Override
    public Category create(Category category) {
        category.setNameUrl(getUrlName(category.getName()));
        return categoryRepository.save(category);
    }

    @Override
    public Category edit(Category category) {
        category.setNameUrl(getUrlName(category.getName()));
        return categoryRepository.save(category);
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.delete(id);
    }

    private String getUrlName(String name) {
        String normalizedName = Normalizer.normalize((name), Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalizedName).replaceAll("")
                .replaceAll("\\s+", "-")
                .toLowerCase();
    }
}
