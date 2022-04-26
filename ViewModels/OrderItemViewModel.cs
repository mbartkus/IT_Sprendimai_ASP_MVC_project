using IT_Sprendimai.Data.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IT_Sprendimai.ViewModels

{
    public class OrderItemViewModel { 

       
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
   
        public Product Product { get; set; }
        public int Quantity { get; set; }
        [Required]
        public decimal UnitPrice { get; set; }

        public string ProductTitle { get; set; }
        public string ProductCategory { get; set; }




    }
}