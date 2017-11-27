package pl.stefanprogramuje.blog.service;

import pl.stefanprogramuje.blog.domain.StaticContent;

public interface StaticContentService {

    StaticContent findById(Long id);

    StaticContent findByName(String name);

    StaticContent edit(StaticContent staticContent);
}
