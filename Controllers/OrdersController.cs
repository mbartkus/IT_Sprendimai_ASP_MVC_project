using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IT_Sprendimai.Data;
using IT_Sprendimai.Data.Entities;
using IT_Sprendimai.ViewModels;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace IT_Sprendimai.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
    public class OrdersController : Controller
    {
        private readonly IDataRepository _repo;
        private readonly ILogger<OrdersController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<StoreUser> _userManager;

        public OrdersController(IDataRepository repo, ILogger<OrdersController> logger, IMapper mapper, UserManager<StoreUser> userManager)
        {
            _repo = repo;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }
        [HttpGet]
        public IActionResult Get(bool includeItems = true)
        {
          //  try
        //    {
                var username = User.Identity.Name;

                var order = _repo.GetAllOrdersByUser(username, includeItems);

                if (order != null)
                {
                    return Ok(_mapper.Map<IEnumerable<Order>, IEnumerable<OrderViewModel>>(order));
                }
                else return BadRequest("Failed to get the orders, probably error in username?");
            }
          /*  catch (Exception ex)
            {
                _logger.LogError($"Failed to get orders: {ex}");
                return BadRequest("Failed to get orders");
            }
        }
          */

    
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
           // try
          // {
                var order = _repo.GetOrderById(User.Identity.Name, id);

                if (order != null)
                { return Ok(_mapper.Map<Order, OrderViewModel>(order)); }
                else return NotFound();
            }

        /*    catch (Exception ex)
            {
                _logger.LogError($"Failed to get orders: {ex}");
                return BadRequest("Failed to get orders");
            }
        }

        */

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] OrderViewModel model)
        {
            if (ModelState.IsValid)  

            {
                var newOrder = new Order() { Id = model.OrderId, OrderNumber = model.OrderNumber, OrderDate = model.OrderDate };
                if (newOrder.OrderDate == DateTime.MinValue){//tikrinu ar nesuvesta darant uzklausa
                      newOrder.OrderDate = DateTime.Now;}
                var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);//find user in db
                newOrder.User = currentUser;

                try
                {
                    _repo.AddEntity(newOrder);
                    if (_repo.SaveAll())
                    {//sukonvertinu atgal kad returnint created()
                        var OrderViewMod = new OrderViewModel() { OrderId = newOrder.Id, OrderDate = newOrder.OrderDate, OrderNumber = newOrder.OrderNumber };

                        return Created($"api/orders/{OrderViewMod.OrderId}", OrderViewMod);
                    }
                }
                catch (Exception ex2)
                {
                    _logger.LogError($"Problem with posting: {ex2}");
                }
                return BadRequest("Failed to add data");
            }
            else return BadRequest(ModelState);




        }
    }

          
    
} 
