using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
    public class NeedHelpController : Controller
    {
        // Действие за страницата "Помощ при депресия"
        public IActionResult Depression()
        {
            // Може да добавиш логика, за да подготвиш данни за изгледа
            return View();
        }


        // Действие за страница "Помощ при гняв"
        public IActionResult Anger()
        {
            // Може да добавиш логика, за да подготвиш данни за изгледа
            return View();
        }
   
    // Действие за страница "Помощ при тъга"
        public IActionResult Sadness()
        {
            // Може да добавиш логика, за да подготвиш данни за изгледа
            return View();
        }
    }
}

