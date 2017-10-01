/*###########################################################
# Name	: expense_types										#
# Type	: table												#
# Usage	: Used to expense types which are selected when 	#
#		  creating new expense								#	
#															#
/############################################################*/
--
CREATE TABLE [dbo].[expense_types](
	[ID_expense_type] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](255) NULL,
	[enabled] [varchar](1) NOT NULL,
	[priority] [varchar](50) NULL,
 CONSTRAINT [PK_expense_types] PRIMARY KEY CLUSTERED 
(
	[ID_expense_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO

ALTER TABLE [dbo].[expense_types] ADD  CONSTRAINT [DF_expense_types_enabled]  DEFAULT ('Y') FOR [enabled]
GO

ALTER TABLE [dbo].[expense_types]  WITH CHECK ADD  CONSTRAINT [expense_type_enabled_chk] CHECK  (([enabled]='N' OR [enabled]='Y'))
GO

ALTER TABLE [dbo].[expense_types] CHECK CONSTRAINT [expense_type_enabled_chk]
GO

--