using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IT_Sprendimai.Migrations
{
    public partial class Migration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProductDbSet",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "OrderDbSet",
                columns: new[] { "Id", "OrderDate", "OrderNumber" },
                values: new object[] { 1, new DateTime(2021, 7, 30, 12, 24, 38, 553, DateTimeKind.Utc).AddTicks(3159), "12345" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OrderDbSet",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "ProductDbSet",
                columns: new[] { "Id", "Category", "Price", "Title" },
                values: new object[] { 1, null, null, null });
        }
    }
}
