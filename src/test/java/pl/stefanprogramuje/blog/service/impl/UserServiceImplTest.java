package pl.stefanprogramuje.blog.service.impl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;
import pl.stefanprogramuje.blog.domain.User;
import pl.stefanprogramuje.blog.domain.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class UserServiceImplTest {

    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    public void findById_withExistingId_shouldReturnUser() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin");
        user.setEnabled(true);
        user.setFullName("Administrator");

        String givenUsername = "admin";
        String expectedUsername = "admin";

        when(userRepository.findOne(givenUsername)).thenReturn(user);

        User found = userService.findById(givenUsername);

        assertThat(found.getUsername()).isEqualTo(expectedUsername);
    }

    @Test
    public void findById_withNonexistentId_shouldReturnNull() {
        String givenUsername = "nonexistent";

        when(userRepository.findOne(givenUsername)).thenReturn(null);

        User found = userService.findById(givenUsername);

        assertThat(found).isNull();
    }

    @SuppressWarnings("unchecked")
    @Test(expected = IllegalArgumentException.class)
    public void findById_withNullId_shouldThrowIllegalArgumentException() {
        when(userRepository.findOne((String) null)).thenThrow(IllegalArgumentException.class);

        userService.findById(null);
    }

    @Test
    public void edit_withNonexistentId_shouldReturnNull() {
        String givenUsername = "nonexistent";
        when(userRepository.findOne(givenUsername)).thenReturn(null);

        User userToEdit = new User();
        userToEdit.setUsername(givenUsername);

        User editedUser = userService.edit(userToEdit);

        assertThat(editedUser).isNull();
    }

    @Test(expected = NullPointerException.class)
    public void edit_withNullUser_shouldThrowNullPointerException() {
        userService.edit(null);
    }

    @Test
    public void edit_withExistingId_shouldReturnUser() {
        String username = "admin";

        User user = new User();
        user.setUsername(username);
        user.setPassword("admin");
        user.setEnabled(true);
        user.setFullName("Administrator");

        User updatedUser = cloneUser(user);
        updatedUser.setFullName("Admin");

        when(userRepository.findOne(username)).thenReturn(user);
        when(userRepository.save(updatedUser)).thenReturn(updatedUser);

        assertThat(userService.edit(updatedUser)).isEqualTo(updatedUser);
    }

    private User cloneUser(User givenUser) {
        User clonedUser = new User();
        clonedUser.setUsername(givenUser.getUsername());
        clonedUser.setPassword(givenUser.getPassword());
        clonedUser.setFullName(givenUser.getFullName());
        clonedUser.setEnabled(givenUser.isEnabled());
        return clonedUser;
    }
}