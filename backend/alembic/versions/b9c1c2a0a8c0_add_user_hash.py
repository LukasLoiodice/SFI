"""add user hash

Revision ID: b9c1c2a0a8c0
Revises: 7b6068a9767a
Create Date: 2025-08-01 18:26:09.486546

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b9c1c2a0a8c0'
down_revision: Union[str, Sequence[str], None] = '7b6068a9767a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
