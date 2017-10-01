/*###########################################################
# Name  : budget                                            #
# Type  : table                                             #
# Usage : Used to store budgets created by users            #
#                                                           #
/############################################################*/
--
CREATE TABLE [dbo].[budget](
    [ID_budget] [int] IDENTITY(1,1) NOT NULL,
    [ID_user] [int] NOT NULL,
    [start_date] [date] NOT NULL,
    [end_date] [date] NOT NULL,
    [amount] [float] NOT NULL,
    [balance] [float] NOT NULL,
 CONSTRAINT [PK_budget] PRIMARY KEY CLUSTERED 
(
    [ID_budget] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO

ALTER TABLE [dbo].[budget]  WITH CHECK ADD  CONSTRAINT [FK_user_budget] FOREIGN KEY([ID_user])
REFERENCES [dbo].[users] ([ID_user])
GO

ALTER TABLE [dbo].[budget] CHECK CONSTRAINT [FK_user_budget]
GO


--