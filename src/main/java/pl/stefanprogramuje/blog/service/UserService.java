package pl.stefanprogramuje.blog.service;

import pl.stefanprogramuje.blog.domain.User;

public interface UserService {

    User findById(String id);

    User edit(User user);
}
