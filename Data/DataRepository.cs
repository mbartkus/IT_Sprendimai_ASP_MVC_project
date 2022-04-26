using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IT_Sprendimai.Data.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace IT_Sprendimai.Data
{
    public class DataRepository : IDataRepository
    {
        private IT_Context _cntx;
        private readonly ILogger<DataRepository> _logger;

        public DataRepository(IT_Context cntx, ILogger<DataRepository> logger )
        {
            _cntx = cntx;
            _logger = logger;
        }
        public IEnumerable<Product> GetAllProducts()
        {
            _logger.LogInformation("GetAllProducts was called");
            return _cntx.ProductDbSet.OrderBy(p => p.Title).ToList();
        }
        public IEnumerable<Product> GetAllProductsByCategory(string category)
        {
            return _cntx.ProductDbSet.Where(p => p.Category == category).ToList();
        }

        public bool SaveAll()
        {
            return _cntx.SaveChanges() > 0;

        }

        public IEnumerable<Order> GetAllOrders(bool includeItems ) 
        {
            if (includeItems == true)
            {
                return _cntx.OrderDbSet.Include(m => m.Items).ThenInclude(n => n.Product).ToList();
            }
            else return _cntx.OrderDbSet.ToList();
        }


        public IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems)
        {
            if (includeItems == true)
            {
                return _cntx.OrderDbSet
                                       .Where(o => o.User.UserName == username)
                                       .Include(m => m.Items)                                      
                                       .ThenInclude(n => n.Product)
                                       .ToList();
            }
            else return _cntx.OrderDbSet
                    .Where(o => o.User.UserName == username)
                    .ToList();
        }




        public Order GetOrderById(string username, int v)
        {
             return _cntx.OrderDbSet.Where(o => o.Id == v && o.User.UserName==username).Include(m => m.Items).ThenInclude(n => n.Product).FirstOrDefault();
           
            
        }

        public void AddEntity(object model)
        {
            _cntx.Add(model);
        }
    }
}
    




  
