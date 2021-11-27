using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName {get; set;}
        [Required]
        [EmailAddress]
        public string Email {get; set;}
        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", ErrorMessage = "Weak password")]
        public string Password {get; set;}
        [Required]
        public string UserName {get; set;}
    }
}