using IT_Sprendimai.Data.Entities;
using System.Collections.Generic;

namespace IT_Sprendimai.Data
{
    public interface IDataRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetAllProductsByCategory(string category);


        IEnumerable<Order> GetAllOrders(bool includeItems);
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);
        Order GetOrderById(string username,int v);

        bool SaveAll();
        void AddEntity(object model);
    }
}