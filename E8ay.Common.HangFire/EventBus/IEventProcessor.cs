﻿using System;
using System.Collections.Generic;
using System.Text;

namespace E8ay.Common.HangFire.EventBus
{
    public interface IEventProcessor
    {
        void Process<T>(Event<T> e);
    }
}
