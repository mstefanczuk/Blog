package pl.stefanprogramuje.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.stefanprogramuje.blog.domain.User;
import pl.stefanprogramuje.blog.domain.repository.UserRepository;
import pl.stefanprogramuje.blog.service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findById(String id) {
        return userRepository.findOne(id);
    }

    @Override
    public User edit(User user) {
        User userToEdit = userRepository.findOne(user.getUsername());
        if (userToEdit == null) {
            return null;
        }
        return userRepository.save(user);
    }
}
