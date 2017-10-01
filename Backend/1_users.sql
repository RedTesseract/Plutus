/*###########################################################
# Name	: users												#
# Type	: table												#
# Usage	: Used to store login information about users 		#
#															#
/############################################################*/
--
CREATE TABLE [dbo].[users](
	[ID_user] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [varchar](50) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[enabled] [varchar](1) NOT NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[ID_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO

ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_enabled]  DEFAULT ('Y') FOR [enabled]
GO

ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [user_enabled_chk] CHECK  (([enabled]='N' OR [enabled]='Y'))
GO

ALTER TABLE [dbo].[users] CHECK CONSTRAINT [user_enabled_chk]
GO

--