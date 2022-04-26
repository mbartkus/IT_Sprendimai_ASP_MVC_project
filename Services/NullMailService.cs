using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IT_Sprendimai.Services
{
    public class NullMailService : IMailService
    {
        private readonly ILogger<NullMailService> _myLogger;
        public NullMailService(ILogger<NullMailService> myLogger)
        {

            _myLogger = myLogger;
        }




        public void SendMessage(string to, string subject, string body)
        {

            _myLogger.LogInformation($"To: {to}, Subject: {subject}, Body: {body} ");
        }
    }
}
