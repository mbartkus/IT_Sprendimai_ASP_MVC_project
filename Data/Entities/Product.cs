﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IT_Sprendimai.Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
       public string Description { get; set; }
     
    }
}
