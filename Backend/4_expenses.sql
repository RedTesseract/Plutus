/*###########################################################
# Name  : expenses                                          #
# Type  : table                                             #
# Usage : Used to store expenses created by user, amount    #
#         required to cover expense and amount applied to   #
#         the expense to date                               #
#                                                           #
/############################################################*/
--
CREATE TABLE [dbo].[expenses](
    [ID_expense] [int] IDENTITY(1,1) NOT NULL,
    [ID_expense_type] [int] NOT NULL,
    [ID_user] [int] NOT NULL,
    [expense_desc] [varchar](255) NULL,
    [expense_date] [date] NOT NULL,
    [reccuring_flag] [varchar](1) NOT NULL,
    [amount_original] [float] NOT NULL,
    [amount_applied] [float] NULL,
 CONSTRAINT [PK_expenses] PRIMARY KEY CLUSTERED 
(
    [ID_expense] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO

ALTER TABLE [dbo].[expenses] ADD  CONSTRAINT [DF_expenses_reccuring_flag]  DEFAULT ('N') FOR [reccuring_flag]
GO

ALTER TABLE [dbo].[expenses]  WITH CHECK ADD  CONSTRAINT [FK_expenses_types] FOREIGN KEY([ID_expense_type])
REFERENCES [dbo].[expense_types] ([ID_expense_type])
GO

ALTER TABLE [dbo].[expenses] CHECK CONSTRAINT [FK_expenses_types]
GO

ALTER TABLE [dbo].[expenses]  WITH CHECK ADD  CONSTRAINT [FK_expenses_users] FOREIGN KEY([ID_user])
REFERENCES [dbo].[users] ([ID_user])
GO

ALTER TABLE [dbo].[expenses] CHECK CONSTRAINT [FK_expenses_users]
GO

ALTER TABLE [dbo].[expenses]  WITH CHECK ADD  CONSTRAINT [reccuring_chk] CHECK  (([reccuring_flag]='N' OR [reccuring_flag]='Y'))
GO

ALTER TABLE [dbo].[expenses] CHECK CONSTRAINT [reccuring_chk]
GO

--