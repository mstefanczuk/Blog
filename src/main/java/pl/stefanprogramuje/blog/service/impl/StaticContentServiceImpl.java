package pl.stefanprogramuje.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.stefanprogramuje.blog.domain.StaticContent;
import pl.stefanprogramuje.blog.domain.repository.StaticContentRepository;
import pl.stefanprogramuje.blog.service.StaticContentService;

@Service
public class StaticContentServiceImpl implements StaticContentService {

    private final StaticContentRepository staticContentRepository;

    @Autowired
    public StaticContentServiceImpl(StaticContentRepository staticContentRepository) {
        this.staticContentRepository = staticContentRepository;
    }

    @Override
    public StaticContent findById(Long id) {
        return staticContentRepository.findOne(id);
    }

    @Override
    public StaticContent findByName(String name) {
        return staticContentRepository.findByName(name);
    }

    @Override
    public StaticContent edit(StaticContent staticContent) {
        return staticContentRepository.save(staticContent);
    }
}
