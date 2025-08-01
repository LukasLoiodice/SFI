"""add user email

Revision ID: 7b6068a9767a
Revises: fe282194aa9b
Create Date: 2025-08-01 18:15:43.333925

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7b6068a9767a'
down_revision: Union[str, Sequence[str], None] = 'fe282194aa9b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
