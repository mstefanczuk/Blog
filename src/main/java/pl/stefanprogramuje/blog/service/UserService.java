package pl.stefanprogramuje.blog.service;

import pl.stefanprogramuje.blog.domain.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findById(String id);

    User create(User user);

    User edit(User user);

    void deleteById(String id);
}
