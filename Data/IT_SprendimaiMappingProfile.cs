using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IT_Sprendimai.Data.Entities;
using IT_Sprendimai.ViewModels;

namespace IT_Sprendimai.Data
{
    public class IT_SprendimaiMappingProfile : Profile
    {
        public IT_SprendimaiMappingProfile() {
            CreateMap<Order, OrderViewModel>()
         .ForMember(o => o.OrderId, ex => ex.MapFrom(o => o.Id))
         .ReverseMap();

            CreateMap<OrderItem, OrderItemViewModel>()
              .ReverseMap().ForMember(m => m.Product, opt => opt.Ignore());
        }
    }
}
