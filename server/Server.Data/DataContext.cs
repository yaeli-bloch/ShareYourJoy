using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<OFile> Files { get; set; }
        public DbSet<Group> Groups { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OFile>()
           .HasOne(o => o.Group)        // קשר בין קובץ לקבוצה
           .WithMany(g => g.Files)      // קבוצה יכולה להכיל הרבה קבצים
           .HasForeignKey(o => o.GroupId);

            //        modelBuilder.Entity<GroupUser>()
            //.HasKey(gu => new { gu.GroupId, gu.UserId });

            //        // קשר בין GroupUser ל-UserId (לא קשר ישיר עם User, אלא רק באמצעות UserId)
            //        modelBuilder.Entity<GroupUser>()
            //            .HasOne<Users>()      // קשר עם משתמש
            //            .WithMany()            // המשתמש יכול להיות חבר בכמה קבוצות דרך הטבלה GroupUser
            //            .HasForeignKey(gu => gu.UserId)
            //            .OnDelete(DeleteBehavior.NoAction);  // הגדרת מחיקה ללא אכיפה

            //        // קשר בין GroupUser ל-Group (קשר עם קבוצות באמצעות GroupId)
            //        modelBuilder.Entity<GroupUser>()
            //            .HasOne<Group>()       // קשר עם Group (הקבוצה)
            //            .WithMany()            // הקבוצה יכולה להכיל הרבה משתמשים דרך הטבלה GroupUser
            //            .HasForeignKey(gu => gu.GroupId)
            //            .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
