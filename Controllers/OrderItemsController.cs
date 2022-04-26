using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IT_Sprendimai.Data;
using IT_Sprendimai.ViewModels;
using IT_Sprendimai.Data.Entities;
using IT_Sprendimai.Controllers;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace IT_Sprendimai.Controllers
{
    [Route("api/orders/{orderId}/items")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OrderItemsController : Controller

    {

        private readonly IDataRepository _repo;
        // private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public OrderItemsController(IDataRepository repo, IMapper mapper)  //ILogger logger
        {
            _repo = repo;
            //  _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get(int orderId)
        {
            var orderObj = _repo.GetOrderById(User.Identity.Name,orderId);
            if (orderObj != null)
            {
                return Ok(_mapper.Map<IEnumerable<OrderItem>, IEnumerable<OrderItemViewModel>>(orderObj.Items));
            }
            else return NotFound();
        }
        [HttpGet("{id}")]
        public IActionResult Get(int orderID, int id)
        {
            var order = _repo.GetOrderById(User.Identity.Name, orderID);
            if (order != null)
            {
                var specificItem = order.Items.Where(i => i.Id == id).FirstOrDefault();
                if (specificItem != null)   
                {
                    return Ok(_mapper.Map<OrderItem, OrderItemViewModel>(specificItem));
                }
            }
            return BadRequest();
        }


    }
}




