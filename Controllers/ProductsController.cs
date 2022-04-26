using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IT_Sprendimai.Data;
using IT_Sprendimai.Data.Entities;
using Microsoft.Extensions.Logging;

namespace IT_Sprendimai.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProductsController : Controller
    {
        private readonly IDataRepository _repo;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IDataRepository repo, ILogger<ProductsController> logger)
        {
            _repo = repo;

            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get()
        {
           try { 
                return Ok(_repo.GetAllProducts());
                }
            catch (Exception ex1){
            
                _logger.LogError($"Failed to get data, error: {ex1}");
                return BadRequest("Failed to get data, error");
}
                }
 
                                 
     }   
}   
            
        
    

